export function makeDonut(id, title, data, fill, titleN, titleLabel) {
  var chart = c3.generate({
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
      colors: fill,
      onclick: function (d, i) {
        console.log('onclick', d, i);
        this.select(d);
      },
      onmouseover: function (d, i) {
        console.log('onmouseover', d, i);
         
      },
      onmouseout: function (d, i) {
        console.log('onmouseout', d, i);
      },
      selection: {
        enabled: true,
      }
    },
    donut: {
      title: title,
      width: 15,
      label: {
        show: false,
      },
      label: {
        show: false,
      },
    },
  });


  // Title Text  
  var label = d3.select('text.c3-chart-arcs-title');
  label.html(''); // remove existant text
  label
    .insert('tspan')
    .text('30')
    .attr('dy', 0)
    .attr('x', 0)
    .attr('class', 'donutTitleBigFont');
  label.insert('tspan').text('Test Data').attr('dy', 20).attr('x', 0);
}
