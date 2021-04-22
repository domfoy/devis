import Card from '@material-ui/core/Card';

export default function withCard(child) {
  return (
    <Card>
      {child}
    </Card>
  )
}