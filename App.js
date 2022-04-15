import Amplify from 'aws-amplify';
import awsconfig from './src/aws-exports'
import { withAuthenticator } from 'aws-amplify-react-native';
import { Main } from './components/Main';
import store from './redux/store'
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context';
Amplify.configure(awsconfig);

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <Toast />
        <Main />
      </Provider>
    </SafeAreaProvider>
  );
}

export default withAuthenticator(App);