

function formatMoney(s, n) {
  n = n > 0 && n <= 20 ? n : 2;
  s = `${parseFloat((`${s}`).replace(/[^\d.-]/g, '')).toFixed(n)}`;
  const l = s.split('.')[0].split('').reverse();
  const r = s.split('.')[1];
  let t = '';
  for (let i = 0; i < l.length; i += 1) {
    t += l[i] + ((i + 1) % 3 === 0 && (i + 1) !== l.length ? ',' : '');
  }
  return `${t.split('').reverse().join('')}.${r}`;
}

export default formatMoney;
