import _ from 'lodash';
import React from 'react';

import {
  formatPrice,
  Section
} from '../../lib';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  recapContent: {
    display: 'flex',
    flexDirection: 'column',
    width: 150,
    marginTop: theme.spacing(2),
    fontSize: '10px',
  },
}));

function buildLine(line, index) {
  return <div
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: 8
    }}
    key={index+1}
  >
    <div style={{padding: '0px 4px'}}>{line.label}</div>
    <div style={{padding: '0px 4px'}}>{line.value}</div>
  </div>;
}

const breakLine = (<hr key={0}></hr>);

function buildLineSection(lineSection, index, lineSections) {
  const lineSectionsCount = lineSections.length;

  return <React.Fragment key={index}>
    {_.map(
      lineSection,
      buildLine
    )}
    {
      index < lineSectionsCount - 1
        ? breakLine
        : null
    }
  </React.Fragment>
}


function Recap(props) {
  const classes = useStyles();

  return <Section
    classes={props.classes}
    customStyle={props.customStyle}
    title={"Estimation du devis"}
  >
    <div classes={classes.recapContent}>
      {
        _(props.lineSections)
          .map(buildLineSection)
          .value()
      }
    </div>
  </Section>
}

export default Recap;