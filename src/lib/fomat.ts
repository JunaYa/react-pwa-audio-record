export const formatMs = (ms: any, all?: any) => {
  const f = Math.floor(ms / 60000), m = Math.floor(ms / 1000) % 60;
  const s = (all || f > 0 ? (f < 10 ? '0' : '') + f + ':' : '')
    + (all || f > 0 || m > 0 ? ('0' + m).substr(-2) + '″' : '')
    + ('00' + ms % 1000).substr(-3);
  return s;
};