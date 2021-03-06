import React from 'react';
import { Animated, View } from 'react-native';
import { FAB, useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Header } from './Header';
import { PurchasesList } from './PurchasesList';
import { PurchasesInfo } from './PurchasesInfo';
import { usePurchases } from '../../contexts/PurchaseContext';
import { useBackInAnimation } from '../../hooks/useBackInAnimation';
import { useZoomAnimation } from '../../hooks/useZoomAnimation';
import { useBackHandlerConfig } from '../../hooks/useBackHandlerConfig';
import { PurchasesLoading } from './PurchasesLoading';
import { RootStackParamList } from '../../@types/routes.types';

import styles from './styles';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function Home({ navigation }: HomeProps): JSX.Element {
  const { purchases, purchasesLoading } = usePurchases();

  const { colors } = useTheme();

  useBackHandlerConfig(navigation);

  const purchaseInfoAnimationStyle = useBackInAnimation({
    direction: 'left',
    delay: 1000,
  });

  const purchaseListAnimationStyle = useBackInAnimation({
    direction: 'right',
    delay: 500,
  });

  const fabAnimationStyle = useZoomAnimation();

  function goToNewPurchase(): void {
    navigation.navigate('NewPurchase');
  }

  if (purchasesLoading) {
    return <PurchasesLoading />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header />

      <Animated.View style={purchaseListAnimationStyle}>
        <PurchasesList purchases={purchases} />
      </Animated.View>

      <Animated.View style={purchaseInfoAnimationStyle}>
        <PurchasesInfo purchases={purchases} />
      </Animated.View>

      <View style={styles.fabContainer}>
        <Animated.View style={fabAnimationStyle}>
          <FAB
            color={colors.icon}
            style={[{ backgroundColor: colors.primary }, styles.fab]}
            icon="plus"
            onPress={goToNewPurchase}
          />
        </Animated.View>
      </View>
    </View>
  );
}
