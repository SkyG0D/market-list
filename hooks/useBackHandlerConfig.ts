import { useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { BackHandler } from 'react-native';

type UseBackHandlerConfig = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export function useBackHandlerConfig(navigation: UseBackHandlerConfig) {
  useEffect(() => {
    function handleGoBack() {
      if (!navigation.canGoBack()) {
        BackHandler.exitApp();
      } else {
        navigation.goBack();
        return true;
      }

      return false;
    }

    BackHandler.addEventListener('hardwareBackPress', handleGoBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
    };
  }, []);
}