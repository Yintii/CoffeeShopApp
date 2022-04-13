import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native';
import { Main } from './components/Main';
Amplify.configure(awsconfig);

function App() {
  return (
    <Main />
  );
}

export default withAuthenticator(App);