// @flow
import Redbox from 'redbox-react'

type Props = {
  error: Error
}

const ErrorReporter = ({ error }: Props) => {
  console.error(error)
  return <Redbox error={error} />
}

export default ErrorReporter
