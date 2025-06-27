import dayjs from 'https://unpkg.com/dayjs@1.11.13/esm/index.js';

export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

export function validDeliveryOption(deliveryOptionId) {
  let found = false;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      found = true;
    }
  });

  return found;
}

function isWeekend(date) {
  const dayOfWeek = date.format('dddd');
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday';
}

export function calculateDeliveryDate(deliveryOption) {
  let remainingDays = deliveryOption.deliveryDays;
  let deliveryDate = dayjs();

  while (remainingDays > 0) {
    deliveryDate = deliveryDate.add(1, 'day');

    if (!isWeekend(deliveryDate)) {
      remainingDays--;
    }
  }

  const dateString = deliveryDate.format(
    'dddd, MMMM D'
  );

  return dateString;
}

function calculateDeliveryDateFrom(orderTime, deliveryOption){
    let orderDate = dayjs(orderTime);
    let daysAdded = 0;

    while(daysAdded < deliveryOption.deliveryDays){
      orderDate = orderDate.add(1, 'day');

      //skip weekends: 0 = Sunday, 6 = Saturday
      if(orderDate.day() !== 0 && orderDate.day() !== 6){
          daysAdded++;
      }
    }

    return orderDate.format('MMMM D');
}


function countDaysBetween(startDate, endDate) {
  return dayjs(endDate).diff(dayjs(startDate), 'day');
}

function findDeliveryOption(orderTime, estimatedDeliveryTime) {
  const daysBetween = countDaysBetween(orderTime, estimatedDeliveryTime);

  return deliveryOptions.find(option => option.deliveryDays === daysBetween
  ) || null;
}

export function orderDeliveryDate(orderTime, estimatedDeliveryTime) {
  const matchedOption = findDeliveryOption(orderTime, estimatedDeliveryTime);

  let deliveryDate;
  if (matchedOption) {
    deliveryDate = calculateDeliveryDateFrom(orderTime, matchedOption);
  }
  return deliveryDate;
}
