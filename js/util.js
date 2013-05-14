// Generated by CoffeeScript 1.4.0
(function() {
  var Collections, base, typeIsArray;

  base = require("./base");

  Collections = base.Collections;

  typeIsArray = function(value) {
    return value && typeof value === 'object' && value instanceof Array && typeof value.length === 'number' && typeof value.splice === 'function' && !(value.propertyIsEnumerable('length'));
  };

  this.make_plot = function(div_id, data_source, defaults, glyphspecs, xrange, yrange, tools, dims, axes) {
    var div, ds, g, glyph, glyphs, glyphspec, myrender, pantool, plot_model, plot_tools, pstool, val, xaxis1, xaxis2, xrule, yaxis1, yaxis2, yrule, zoomtool, _i, _j, _len, _len1, _ref;
    if (tools == null) {
      tools = false;
    }
    if (dims == null) {
      dims = [400, 400];
    }
    if (axes == null) {
      axes = true;
    }
    plot_tools = [];
    if (tools) {
      pantool = Collections('PanTool').create({
        dataranges: [xrange.ref(), yrange.ref()],
        dimensions: ['width', 'height']
      });
      zoomtool = Collections('ZoomTool').create({
        dataranges: [xrange.ref(), yrange.ref()],
        dimensions: ['width', 'height']
      });
      pstool = Collections('PreviewSaveTool').create();
      plot_tools = [pantool, zoomtool, pstool];
    }
    glyphs = [];
    if (!typeIsArray(glyphspecs)) {
      glyphspecs = [glyphspecs];
    }
    if (!typeIsArray(data_source)) {
      for (_i = 0, _len = glyphspecs.length; _i < _len; _i++) {
        glyphspec = glyphspecs[_i];
        glyph = Collections('GlyphRenderer').create({
          data_source: data_source.ref(),
          glyphspec: glyphspec
        });
        glyph.set(defaults);
        glyphs.push(glyph);
      }
    } else {
      _ref = zip(glyphspecs, data_source);
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        val = _ref[_j];
        glyphspec = val[0], ds = val[1];
        glyph = Collections('GlyphRenderer').create({
          data_source: ds.ref(),
          glyphspec: glyphspec
        });
        glyph.set(defaults);
        glyphs.push(glyph);
      }
    }
    plot_model = Collections('Plot').create({
      x_range: xrange,
      y_range: yrange,
      canvas_width: dims[0],
      canvas_height: dims[1],
      outer_width: dims[0],
      outer_height: dims[1],
      tools: plot_tools
    });
    plot_model.set(defaults);
    plot_model.add_renderers((function() {
      var _k, _len2, _results;
      _results = [];
      for (_k = 0, _len2 = glyphs.length; _k < _len2; _k++) {
        g = glyphs[_k];
        _results.push(g.ref());
      }
      return _results;
    })());
    if (axes) {
      xaxis1 = Collections('GuideRenderer').create({
        guidespec: {
          type: 'linear_axis',
          dimension: 0,
          location: 'min',
          bounds: 'auto'
        },
        parent: plot_model.ref()
      });
      yaxis1 = Collections('GuideRenderer').create({
        guidespec: {
          type: 'linear_axis',
          dimension: 1,
          location: 'min',
          bounds: 'auto'
        },
        parent: plot_model.ref()
      });
      xaxis2 = Collections('GuideRenderer').create({
        guidespec: {
          type: 'linear_axis',
          dimension: 0,
          location: 'max',
          bounds: 'auto'
        },
        parent: plot_model.ref()
      });
      yaxis2 = Collections('GuideRenderer').create({
        guidespec: {
          type: 'linear_axis',
          dimension: 1,
          location: 'max',
          bounds: 'auto'
        },
        parent: plot_model.ref()
      });
      xrule = Collections('GuideRenderer').create({
        guidespec: {
          type: 'rule',
          dimension: 0,
          bounds: 'auto'
        },
        parent: plot_model.ref()
      });
      yrule = Collections('GuideRenderer').create({
        guidespec: {
          type: 'rule',
          dimension: 1,
          bounds: 'auto'
        },
        parent: plot_model.ref()
      });
      plot_model.add_renderers([xrule.ref(), yrule.ref(), xaxis1.ref(), yaxis1.ref(), xaxis2.ref(), yaxis2.ref()]);
    }
    div = $(div_id);
    myrender = function() {
      var view;
      view = new plot_model.default_view({
        model: plot_model
      });
      return div.append(view.$el);
    };
    return _.defer(myrender);
  };

}).call(this);
