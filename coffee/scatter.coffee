Collections = require("./base").Collections
Rand = require('../common/random').Rand

zip = () ->
  lengthArray = (arr.length for arr in arguments)
  length = Math.min(lengthArray...)
  for i in [0...length]
    arr[i] for arr in arguments

scatter_demo = (div_id) ->
  r = new Rand(123456789)

  x = (r.randf()*100 for i in _.range(4000))
  y = (r.randf()*100 for i in _.range(4000))
  radii = (r.randf()+0.3 for i in _.range(4000))
  colors = ("rgb(#{ Math.floor(50+2*val[0]) }, #{ Math.floor(30+2*val[1]) }, 150)" for val in zip(x, y))
  source = Collections('ColumnDataSource').create(
    data:
      x: x
      y: y
      radius: radii
      fill: colors
  )

  xdr = Collections('Range1d').create({start: 0, end: 100})
  ydr = Collections('Range1d').create({start: 0, end: 100})

  scatter = {
    x: 'x'
    y: 'y'
    radius: 'radius'
    radius_units: 'data'
    fill_color: 'fill'
    fill_alpha: 0.6
    type: 'circle',
    line_color: null
  }

  this.make_plot(div_id, source, {}, [scatter], xdr, ydr, {dims: [600, 600], plot_title: "", legend: false})

this.scatter_demo = scatter_demo
