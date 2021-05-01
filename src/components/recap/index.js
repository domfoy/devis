import _ from 'lodash';

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
    key={index}
  >
    <div>{line.label}</div>
    <div>{line.value}</div>
  </div>;
}

const breakLine = (<hr></hr>);

function buildLineSection(lineSection, index, lineSections) {
  const lineSectionsCount = lineSections.length;

  return <>
    {_.map(
      lineSection,
      buildLine
    )}
    {
      index < lineSectionsCount - 1
        ? breakLine
        : null
    }

  </>
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