// Libraries
import React, { PureComponent } from 'react';

// Services & Utils
import { processTimeSeries, ThemeContext } from '@grafana/ui';

// Components
import { Piechart, PieChartDataPoint } from '@grafana/ui';

// Types
import { PiechartOptions } from './types';
import { PanelProps, NullValueMode } from '@grafana/ui/src/types';

interface Props extends PanelProps<PiechartOptions> {}

export class PiechartPanel extends PureComponent<Props> {
  render() {
    const { panelData, width, height, options } = this.props;
    const { valueOptions } = options;

    let datapoints: PieChartDataPoint[] = [];
    if (panelData.timeSeries) {
      const vmSeries = processTimeSeries({
        timeSeries: panelData.timeSeries,
        nullValueMode: NullValueMode.Null,
      });

      vmSeries.forEach(serie => {
        if (serie) {
          datapoints.push({
            value: serie.stats[valueOptions.stat],
            // TODO: get name
            name: 'tmpName',
            // TODO: add color option
            color: 'tmpColor'
          });
        }
      });
    }
    // TODO: support table data

    return (
      <ThemeContext.Consumer>
        {theme => (
          <Piechart
            width={width}
            height={height}
            datapoints={datapoints}
            pieType={options.pieType}
            unit={options.unit}
            stat={options.stat}
            strokeWidth={options.strokeWidth}
            theme={theme}
          />
        )}
      </ThemeContext.Consumer>
    );
  }
}
