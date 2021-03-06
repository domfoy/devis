import Card from '@material-ui/core/Card';

export function withCard(child) {
  return (
    <Card>
      {child}
    </Card>
  )
}