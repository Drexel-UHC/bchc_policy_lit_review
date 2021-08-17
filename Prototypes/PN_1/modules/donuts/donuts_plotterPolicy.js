export function makeDonutPolicy(id, title, data) {
  c3.generate({
    bindto: id,
    size: {
      height: 200,
    },
    legend: {
      hide: true,
    },
    data: {
      columns: data,
      type: 'donut',
      onclick: function (d, i) {
        console.log('onclick', d, i);
      },
      onmouseover: function (d, i) {
        console.log('onmouseover', d, i);
      },
      onmouseout: function (d, i) {
        console.log('onmouseout', d, i);
      },
    },
    donut: {
      title: title,
    },
  });
}
