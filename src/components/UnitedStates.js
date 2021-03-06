import React from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { withRouter, Link } from 'react-router-dom';

import State from './State';
import { CELL_SIZE, STATE_CODE_TO_NAME } from '../constants';

const styles = {
  UnitedStates: {
    fontFamily: 'Atlas Grotesk',
    fontSize: '16px',
    textAlign: 'center',
  },
  grid: {
    width: '920px',
    margin: '0 auto',
    marginTop: '40px',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  row: {
    height: CELL_SIZE,
  },
  currentState: {
    transform: 'uppercase',
  },
};

class UnitedStates extends React.Component {
  state = { hoveredState: 'The United States of America' };

  handleOnClick = state => {
    this.props.history.push(`/state/${state.code}`);
  };

  handleOnMouseEnter = state => {
    if (STATE_CODE_TO_NAME[state.code] !== this.state.hoveredState) {
      this.setState({ hoveredState: STATE_CODE_TO_NAME[state.code] });
    }
  };

  handleOnMouseLeave = () => {
    this.setState({ hoveredState: 'The United States of America' });
  };

  render() {
    const { classes, grid } = this.props;
    return (
      <div className={classes.UnitedStates}>
        <Helmet>
          <title>The Gerry App</title>
        </Helmet>
        <p className={classes.currentState}>
          Click on a state!
          <br />
          Explore {this.state.hoveredState}.
        </p>
        <div className={classes.grid} onMouseLeave={this.handleOnMouseLeave}>
          {grid.map((row, index) => {
            return (
              <div className={classes.row} key={index}>
                {row.map((state, sIndex) => (
                  <State
                    key={sIndex}
                    state={state}
                    onMouseEnter={this.handleOnMouseEnter}
                    onClick={this.handleOnClick}
                  />
                ))}
              </div>
            );
          })}
        </div>
        <p>
          <i>Or</i> play our{' '}
          <Link to="/mission/population" className={classes.mission}>
            missions
          </Link>
          ...
        </p>
        <p>
          Read about gerrymandering and congressional redistricting in{' '}
          <Link to="/current-events">current events.</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  grid: state.core.unitedStatesGrid,
});

export default withRouter(
  connect(mapStateToProps)(injectSheet(styles)(UnitedStates)),
);
