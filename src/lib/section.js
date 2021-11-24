import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardContent';
import CardContent from '@material-ui/core/CardContent';

function Section(props) {
  return (
    <div className={props.classes.outerSection} style={props.customStyle}>
      <Card className={props.classes.innerSection}>
        <CardHeader
          className={props.classes.sectionHeader}
        >
          <span>{props.title}</span>
        </CardHeader>
        <CardContent style={props.containerCustomStyle}>
          {props.children}
        </CardContent>
      </Card>
    </div>
  );
}

export default Section;