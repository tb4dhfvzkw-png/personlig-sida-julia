// Inclusive course dates; split courses retain their scheduled breaks.
function courseStatus(periods, today) {
  if (!periods.length) return { key: 'unknown', label: 'Datum kommer' };
  if (periods.some(period => period.start <= today && today <= period.end)) {
    return { key: 'active', label: 'Pågår' };
  }
  if (periods.every(period => period.end < today)) {
    return { key: 'ended', label: 'Avslutad kursperiod' };
  }
  if (periods.some(period => period.end < today)) {
    return { key: 'break', label: 'Mellan kursperioder' };
  }
  return { key: 'upcoming', label: 'Kommande' };
}

function updateCourseStatuses() {
  const parts = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Stockholm', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date());
  const part = type => parts.find(item => item.type === type).value;
  const today = `${part('year')}-${part('month')}-${part('day')}`;
  document.querySelectorAll('.course-card').forEach(card => {
    const status = courseStatus(JSON.parse(card.dataset.periods), today);
    card.dataset.status = status.key;
    card.querySelector('.course-status').textContent = status.label;
  });
}
updateCourseStatuses();
// Refresh after returning to a tab left open overnight.
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) updateCourseStatuses();
});
