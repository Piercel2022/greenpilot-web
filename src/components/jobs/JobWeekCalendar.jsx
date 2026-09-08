import { ChevronLeft, ChevronRight } from "lucide-react";

const DAY_START_HOUR = 7;
const DAY_END_HOUR = 20;
const HOUR_HEIGHT = 72;

const statusStyles = {
  planned: "border-blue-200 bg-blue-50 text-blue-800",
  in_progress: "border-amber-200 bg-amber-50 text-amber-800",
  completed: "border-emerald-200 bg-emerald-50 text-emerald-800",
  cancelled: "border-red-200 bg-red-50 text-red-800",
};

const priorityStyles = {
  low: "border-l-slate-400",
  normal: "border-l-slate-500",
  high: "border-l-orange-500",
  urgent: "border-l-red-600",
};

const statusLabels = {
  planned: "Planifiée",
  in_progress: "En cours",
  completed: "Terminée",
  cancelled: "Annulée",
};

const priorityLabels = {
  low: "Faible",
  normal: "Normale",
  high: "Haute",
  urgent: "Urgente",
};

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);

  return result;
}

function formatDayName(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "short",
  })
    .format(date)
    .replace(".", "");
}

function formatDayNumber(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
  }).format(date);
}

function formatMonth(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  }).format(date);
}

function parseLocalDateTime(dateTime) {
  if (!dateTime) return null;

  const value = String(dateTime);

  /*
   * Rails peut renvoyer :
   *
   * 2026-09-06T08:00:00
   * 2026-09-06T08:00:00.000
   * 2026-09-06T08:00:00+02:00
   * 2026-09-06T08:00:00Z
   *
   * Lorsqu'aucun offset n'est fourni, on considère que
   * l'heure représente directement l'heure locale du planning.
   */
  if (!/[zZ]|[+-]\d{2}:\d{2}$/.test(value)) {
    const match = value.match(
      /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/
    );

    if (!match) return null;

    const [
      ,
      year,
      month,
      day,
      hour,
      minute,
      second = "0",
    ] = match;

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute),
      Number(second)
    );
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

function getDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getJobDateKey(job) {
  if (!job.scheduled_date) return null;

  return String(job.scheduled_date).slice(0, 10);
}

function getJobStartMinutes(job) {
  const date = parseLocalDateTime(job.scheduled_start_at);

  if (!date) {
    return null;
  }

  return date.getHours() * 60 + date.getMinutes();
}

function getJobEndMinutes(job) {
  const date = parseLocalDateTime(job.scheduled_end_at);

  if (!date) {
    return null;
  }

  return date.getHours() * 60 + date.getMinutes();
}

function getCustomerName(job) {
  return (
    job.customer?.name ||
    job.customer_name ||
    "Client non renseigné"
  );
}

function getSiteName(job) {
  return (
    job.site?.name ||
    job.site_name ||
    "Site non renseigné"
  );
}

function isToday(date) {
  return getDateKey(date) === getDateKey(new Date());
}

function getJobPosition(job) {
  const startMinutes = getJobStartMinutes(job);

  if (startMinutes === null) {
    return null;
  }

  const endMinutes = getJobEndMinutes(job);

  const effectiveEndMinutes =
    endMinutes === null
      ? startMinutes + 60
      : Math.max(endMinutes, startMinutes + 30);

  const calendarStartMinutes = DAY_START_HOUR * 60;

  const topMinutes = Math.max(
    startMinutes - calendarStartMinutes,
    0
  );

  const durationMinutes = Math.max(
    effectiveEndMinutes - startMinutes,
    30
  );

  return {
    top: (topMinutes / 60) * HOUR_HEIGHT,
    height: Math.max(
      (durationMinutes / 60) * HOUR_HEIGHT,
      48
    ),
  };
}

function jobsOverlap(firstJob, secondJob) {
  const firstStart = getJobStartMinutes(firstJob);
  const firstEnd = getJobEndMinutes(firstJob);

  const secondStart = getJobStartMinutes(secondJob);
  const secondEnd = getJobEndMinutes(secondJob);

  if (
    firstStart === null ||
    secondStart === null
  ) {
    return false;
  }

  const firstEffectiveEnd =
    firstEnd === null
      ? firstStart + 60
      : Math.max(firstEnd, firstStart + 30);

  const secondEffectiveEnd =
    secondEnd === null
      ? secondStart + 60
      : Math.max(secondEnd, secondStart + 30);

  return (
    firstStart < secondEffectiveEnd &&
    secondStart < firstEffectiveEnd
  );
}

function calculateOverlapLayout(jobs) {
  const sortedJobs = [...jobs].sort((firstJob, secondJob) => {
    const firstStart = getJobStartMinutes(firstJob) ?? 0;
    const secondStart = getJobStartMinutes(secondJob) ?? 0;

    if (firstStart !== secondStart) {
      return firstStart - secondStart;
    }

    const firstEnd = getJobEndMinutes(firstJob) ?? firstStart + 60;
    const secondEnd =
      getJobEndMinutes(secondJob) ?? secondStart + 60;

    return firstEnd - secondEnd;
  });

  const columns = [];
  const layouts = new Map();

  sortedJobs.forEach((job) => {
    let columnIndex = 0;

    while (
      columns[columnIndex]?.some((existingJob) =>
        jobsOverlap(existingJob, job)
      )
    ) {
      columnIndex += 1;
    }

    if (!columns[columnIndex]) {
      columns[columnIndex] = [];
    }

    columns[columnIndex].push(job);

    layouts.set(job.id, {
      column: columnIndex,
    });
  });

  sortedJobs.forEach((job) => {
    const layout = layouts.get(job.id);

    if (!layout) return;

    const overlappingJobs = sortedJobs.filter(
      (otherJob) =>
        otherJob.id !== job.id &&
        jobsOverlap(job, otherJob)
    );

    const overlappingColumns = overlappingJobs.reduce(
      (maxColumn, otherJob) => {
        const otherLayout = layouts.get(otherJob.id);

        if (!otherLayout) {
          return maxColumn;
        }

        return Math.max(
          maxColumn,
          otherLayout.column
        );
      },
      layout.column
    );

    layout.columnCount = overlappingColumns + 1;
  });

  return layouts;
}

function getWeekJobs(jobs, date) {
  const dateKey = getDateKey(date);

  return jobs.filter(
    (job) => getJobDateKey(job) === dateKey
  );
}

function TimeColumn() {
  const hours = [];

  for (
    let hour = DAY_START_HOUR;
    hour <= DAY_END_HOUR;
    hour += 1
  ) {
    hours.push(hour);
  }

  return (
    <div className="w-16 shrink-0 border-r border-slate-200 bg-slate-50">
      <div className="h-16 border-b border-slate-200" />

      {hours.map((hour) => (
        <div
          key={hour}
          className="relative border-b border-slate-200 text-right"
          style={{ height: HOUR_HEIGHT }}
        >
          <span className="relative -top-2 pr-2 text-xs text-slate-400">
            {String(hour).padStart(2, "0")}:00
          </span>
        </div>
      ))}
    </div>
  );
}

function JobCard({
  job,
  onJobClick,
  compact = false,
  layout,
}) {
  const statusClass =
    statusStyles[job.status] ||
    "border-slate-200 bg-slate-50 text-slate-800";

  const priorityClass =
    priorityStyles[job.priority] ||
    "border-l-slate-400";

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => onJobClick(job)}
        className={`w-full overflow-hidden rounded-lg border border-l-4 p-2 text-left shadow-sm transition hover:shadow-md ${statusClass} ${priorityClass}`}
        title={job.title}
      >
        <div className="truncate text-xs font-semibold">
          {job.title || "Intervention"}
        </div>

        <div className="mt-1 truncate text-[11px] opacity-80">
          {getCustomerName(job)}
        </div>

        <div className="truncate text-[11px] opacity-70">
          {getSiteName(job)}
        </div>

        <div className="mt-1 text-[10px] font-medium opacity-70">
          {statusLabels[job.status] ||
            job.status ||
            "—"}
          {" · "}
          {priorityLabels[job.priority] ||
            job.priority ||
            "—"}
        </div>
      </button>
    );
  }

  const column = layout?.column ?? 0;
  const columnCount = layout?.columnCount ?? 1;

  const horizontalGap = 4;

  return (
    <button
      type="button"
      onClick={() => onJobClick(job)}
      className={`absolute overflow-hidden rounded-lg border border-l-4 p-2 text-left shadow-sm transition hover:z-20 hover:shadow-md ${statusClass} ${priorityClass}`}
      style={{
        top: layout.position.top,
        height: layout.position.height,
        left: `calc(${(column / columnCount) * 100}% + ${
          horizontalGap / 2
        }px)`,
        width: `calc(${100 / columnCount}% - ${
          horizontalGap
        }px)`,
      }}
      title={job.title}
    >
      <div className="truncate text-xs font-semibold">
        {job.title || "Intervention"}
      </div>

      <div className="mt-1 truncate text-[11px] opacity-80">
        {getCustomerName(job)}
      </div>

      <div className="truncate text-[11px] opacity-70">
        {getSiteName(job)}
      </div>

      {layout.position.height >= 70 && (
        <div className="mt-1 text-[11px] font-medium">
          {job.scheduled_start_at
            ? new Intl.DateTimeFormat("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              }).format(
                parseLocalDateTime(
                  job.scheduled_start_at
                )
              )
            : "—"}
          {" → "}
          {job.scheduled_end_at
            ? new Intl.DateTimeFormat("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              }).format(
                parseLocalDateTime(
                  job.scheduled_end_at
                )
              )
            : "—"}
        </div>
      )}

      {layout.position.height >= 95 && (
        <div className="mt-1 truncate text-[10px] opacity-70">
          {statusLabels[job.status] ||
            job.status ||
            "—"}
          {" · "}
          {priorityLabels[job.priority] ||
            job.priority ||
            "—"}
        </div>
      )}
    </button>
  );
}

function DayColumn({ date, jobs, onJobClick }) {
  const positionAreaHeight =
    (DAY_END_HOUR - DAY_START_HOUR + 1) *
    HOUR_HEIGHT;

  const dayJobs = getWeekJobs(jobs, date);

  const scheduledJobs = dayJobs.filter(
    (job) => getJobStartMinutes(job) !== null
  );

  const unscheduledJobs = dayJobs.filter(
    (job) => getJobStartMinutes(job) === null
  );

  const overlapLayouts = calculateOverlapLayout(
    scheduledJobs
  );

  return (
    <div className="min-w-[150px] flex-1 border-r border-slate-200 last:border-r-0">
      <div
        className={`flex h-16 flex-col items-center justify-center border-b border-slate-200 ${
          isToday(date) ? "bg-slate-100" : "bg-white"
        }`}
      >
        <span
          className={`text-xs font-medium uppercase ${
            isToday(date)
              ? "text-slate-900"
              : "text-slate-500"
          }`}
        >
          {formatDayName(date)}
        </span>

        <span
          className={`mt-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
            isToday(date)
              ? "bg-slate-900 text-white"
              : "text-slate-900"
          }`}
        >
          {formatDayNumber(date)}
        </span>
      </div>

      {unscheduledJobs.length > 0 && (
        <div className="border-b border-slate-200 bg-slate-50 p-1.5">
          <div className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
            Sans horaire
          </div>

          <div className="space-y-1.5">
            {unscheduledJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onJobClick={onJobClick}
                compact
              />
            ))}
          </div>
        </div>
      )}

      <div
        className="relative bg-white"
        style={{ height: positionAreaHeight }}
      >
        {Array.from({
          length: DAY_END_HOUR - DAY_START_HOUR + 1,
        }).map((_, index) => (
          <div
            key={index}
            className="absolute left-0 right-0 border-b border-slate-100"
            style={{
              top: index * HOUR_HEIGHT,
            }}
          />
        ))}

        {scheduledJobs.map((job) => {
          const position = getJobPosition(job);

          if (!position) {
            return null;
          }

          const overlapLayout =
            overlapLayouts.get(job.id);

          return (
            <JobCard
              key={job.id}
              job={job}
              onJobClick={onJobClick}
              layout={{
                ...overlapLayout,
                position,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function JobWeekCalendar({
  jobs = [],
  weekStart,
  onPreviousWeek,
  onNextWeek,
  onToday,
  onJobClick,
}) {
  const weekDays = Array.from({ length: 7 }, (_, index) =>
    addDays(weekStart, index)
  );

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold capitalize text-slate-900">
            {formatMonth(weekStart)}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Semaine du{" "}
            {new Intl.DateTimeFormat("fr-FR", {
              day: "2-digit",
              month: "long",
            }).format(weekStart)}
            {" au "}
            {new Intl.DateTimeFormat("fr-FR", {
              day: "2-digit",
              month: "long",
            }).format(weekDays[6])}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPreviousWeek}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50"
            aria-label="Semaine précédente"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={onToday}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Aujourd’hui
          </button>

          <button
            type="button"
            onClick={onNextWeek}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50"
            aria-label="Semaine suivante"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-[1120px]">
          <TimeColumn />

          <div className="flex min-w-0 flex-1">
            {weekDays.map((date) => (
              <DayColumn
                key={getDateKey(date)}
                date={date}
                jobs={jobs}
                onJobClick={onJobClick}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}