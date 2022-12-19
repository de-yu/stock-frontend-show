import _ from 'lodash';

export function calculateMA(dayCount: number, data: number[]) {
  const result = _.fill(Array(dayCount), '-');

  const first = data.slice(0, dayCount);

  for (let i = dayCount; i < data.length; i += 1) {
    first.shift();
    first.push(data[i]);
    result.push((_.sum(first) / dayCount).toFixed(2));
  }

  return result;
}

export function calculateStandardDeviation(dayCount: number, data: number[]): BooleanPassageType {
  const average = _.fill(Array(dayCount), '-');
  const deviation = _.fill(Array(dayCount), '-');
  const upper = _.fill(Array(dayCount), '-');
  const lower = _.fill(Array(dayCount), '-');
  const first: number[] = data.slice(0, dayCount);

  for (let i = dayCount; i < data.length; i += 1) {
    first.shift();
    first.push(data[i]);
    average.push(_.sum(first) / dayCount);

    let deviationTemp = 0;
    _.forEach(first, (point: number) => {
      deviationTemp += (_.last(average) - point) * (_.last(average) - point);
    });
    deviationTemp = Math.sqrt(deviationTemp / dayCount);
    upper.push((_.last(average) + 2 * deviationTemp).toFixed(2));
    lower.push((_.last(average) - 2 * deviationTemp).toFixed(2));
  }

  return {
    upper,
    lower,
  };
}
