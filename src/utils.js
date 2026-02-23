import dayjs from 'dayjs';
import { FILTER_TYPE } from './const.js';

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomIntInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArrayItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomSubarray(items, maxCount = items.length) {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  const count = getRandomIntInRange(0, Math.min(maxCount, items.length));
  return shuffled.slice(0, count);
}

function getRandomDate(from = new Date('2026-01-01'), to = new Date('2026-12-31')) {
  const fromTime = from.getTime();
  const toTime = to.getTime();
  return new Date(getRandomIntInRange(fromTime, toTime));
}

function addRandomDuration(start, maxHours = 12) {
  const end = new Date(start);
  end.setHours(end.getHours() + getRandomIntInRange(1, maxHours));
  return end;
}

function generatePictureUrl(seed) {
  return `https://loremflickr.com/248/152?random=${seed}`;
}

function formatDuration(start, end) {
  const diffMs = end - start;
  const totalMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
}

function sortPointByDay(pointA, pointB) {
  const dateA = new Date(pointA.startTime);
  const dateB = new Date(pointB.startTime);
  return dateA - dateB;
}

function sortPointByTime(pointA, pointB) {
  const durationA = new Date(pointA.endTime) - new Date(pointA.startTime);
  const durationB = new Date(pointB.endTime) - new Date(pointB.startTime);
  return durationB - durationA;
}

function sortPointByPrice(pointA, pointB) {
  return pointB.basePrice - pointA.basePrice;
}

function formatDateTime(date) {
  return dayjs(date).format('DD/MM/YY HH:mm');
}

function isDatesEqual(dateA, dateB) {
  return (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
}

function isDateFuture(date) {
  return date && dayjs(date).isAfter(dayjs());
}

function isDatePast(date) {
  return date && dayjs(date).isBefore(dayjs());
}

function isDatePresent(startDate, endDate) {
  const now = dayjs();
  return startDate && endDate &&
    !now.isBefore(startDate) &&
    !now.isAfter(endDate);
}

const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => points,

  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) =>
    point.startDate && isDateFuture(point.startDate)
  ),

  [FILTER_TYPE.PRESENT]: (points) => points.filter((point) =>
    point.startDate && point.endDate && isDatePresent(point.startDate, point.endDate)
  ),

  [FILTER_TYPE.PAST]: (points) => points.filter((point) =>
    point.endDate && isDatePast(point.endDate)
  )
};

export {
  getRandomInt,
  getRandomIntInRange,
  getRandomArrayItem,
  getRandomSubarray,
  getRandomDate,
  addRandomDuration,
  generatePictureUrl,
  formatDuration,
  sortPointByDay,
  sortPointByTime,
  sortPointByPrice,
  formatDateTime,
  isDatesEqual,
  filter
};
