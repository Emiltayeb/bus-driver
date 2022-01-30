const getTopPlayers = function (docs: any) {
 if (!docs?.length) return [];
 const topPlayers: any = [];
 docs.forEach((doc: any) => {
  topPlayers.push({ ...doc.data(), id: doc.id });
 });
 return topPlayers;
};

export default getTopPlayers;
