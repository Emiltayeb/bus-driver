const getTopScores = function (data: Record<string, any>): Promise<Record<string, number>[]> {
 return new Promise((res, rej) => {
  let finalLeaderScore: Record<string, number>[] = [];

  for (const key in data) {
   if (Object.prototype.hasOwnProperty.call(data, key)) {
    const element = data[key];
    finalLeaderScore.push(element);
   }
  }

  res(
   finalLeaderScore.sort((a, b) => {
    const [aValue] = Object.values(a);
    const [bValue] = Object.values(b);
    return aValue - bValue;
   })
  );
 });
};

export default getTopScores;
