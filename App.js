import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native';
import { Main } from './components/Main';
import store from './redux/store'
import { Provider } from 'react-redux'
Amplify.configure(awsconfig);

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default withAuthenticator(App);