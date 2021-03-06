import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import cx from 'classnames';
import _ from 'lodash';
import hotkey from 'react-hotkey';

import utils from '../utils';
import PickerContainer from '../containers/PickerContainer';

class Series extends Component {
  constructor(props) {
    super(props);
    hotkey.addHandler(this.handleHotkey);
  }
  componentWillUnmount() {
    hotkey.removeHandler(this.handleHotkey);
  }
  onClick = () => {
    if (this.props.visible) {
      this.props.hideSeries();
    }
  }
  handleHotkey = (e) => {
    switch (e.key) {
      case 'Escape':
        this.props.hideSeries();
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <div
        className={cx({
          series: true,
          visible: this.props.visible
        })}
        ref="series"
      >
        <div
          className={cx({
            'series-content': true,
            visible: this.props.visible
          })}
          ref="seriesContent"
        >
          <div className="series-side">
            <div
              className="series-image"
              style={{
                backgroundImage: this.props.series.image_url ?
                  `url(${this.props.series.image_url})`
                  : 'none'
              }}
            >
            </div>
            <div className="series-picker">
              <PickerContainer series={this.props.series} />
            </div>
          </div>
          <div className="series-main">
            <div className="series-right-top">
              <div className="series-meta">
                {`${_.upperCase(this.props.series.type)} with
                ${this.props.series.episodes_total || this.props.series.chapters || '?'}
                ${utils.isAnime(this.props.series.type) ? 'Episodes' : 'Chapters'}`}
              </div>
              <div className="series-title">{this.props.series.title}</div>
              <div className="series-synopsis">
                {$('<p>').html(this.props.series.synopsis).text().replace(/\n/gi, '\n\n')}
              </div>
            </div>
            <div className="series-right-table">
              <div className="series-table-row">
                <div className="series-table-row-key">
                  Genres
                </div>
                <div className="series-table-row-value">
                  {
                    _.map(this.props.series.genres, (genre) => {
                      return _.capitalize(genre);
                    }).join(', ')
                  }
                </div>
              </div>
              <div className="series-table-row">
                <div className="series-table-row-key">
                  Synonymous title(s)
                </div>
                <div className="series-table-row-value">
                  {
                    this.props.series.title_synonyms ?
                      _.map(this.props.series.title_synonyms, (title) => {
                        return <div key={`series-title-${title}`}>{title}</div>;
                      })
                    : 'None'
                  }
                </div>
              </div>
              <div className="series-table-row">
                <div className="series-table-row-key">
                  English title(s)
                </div>
                <div className="series-table-row-value">
                  {
                    this.props.series.title_english ?
                      _.map(this.props.series.title_english, (title) => {
                        return <div key={`series-title-${title}`}>{title}</div>;
                      })
                    : 'None'
                  }
                </div>
              </div>
              <div className="series-table-row">
                <div className="series-table-row-key">
                  Japanese title(s)
                </div>
                <div className="series-table-row-value">
                  {
                    this.props.series.title_japanese ?
                      _.map(this.props.series.title_japanese, (title) => {
                        return <div key={`series-title-${title}`}>{title}</div>;
                      })
                    : 'None'
                  }
                </div>
              </div>
              <div className="series-table-row">
                <div className="series-table-row-key">
                  Start date
                </div>
                <div className="series-table-row-value">
                  {moment(new Date(this.props.series.start_date)).format('MMMM D, YYYY')}
                </div>
              </div>
              <div className="series-table-row">
                <div className="series-table-row-key">
                  End date
                </div>
                <div className="series-table-row-value">
                  {
                    this.props.series.end_date ?
                      moment(new Date(this.props.series.end_date)).format('MMMM D, YYYY')
                    : 'Unknown'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={cx({
            'series-overlay': true,
            visible: this.props.visible
          })}
          onClick={this.onClick}
          ref="seriesOverlay"
        >
        </div>
      </div>
    );
  }
}

Series.propTypes = {
  // Actions
  loadEpisodes: PropTypes.func.isRequired,
  hideSeries: PropTypes.func.isRequired,

  // Props
  series: PropTypes.object,
  episodes: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired
};

export default Series;
