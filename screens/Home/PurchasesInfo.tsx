import React from 'react';
import { View } from 'react-native';

import {
  Avatar,
  Card,
  Headline,
  Paragraph,
  Title,
  useTheme,
} from 'react-native-paper';

import { Purchase } from '../../@types/general.types';
import { formatPriceToBrazilStyle } from '../../utils/formatters';
import { sum } from '../../utils/sum';

import styles from './styles';

interface PurchasesInfoProps {
  purchases: Purchase[];
}

export function PurchasesInfo({ purchases }: PurchasesInfoProps): JSX.Element {
  const { colors } = useTheme();

  const totalPrice = sum(purchases, ({ total }) => total);

  const totalProducts = sum(purchases, ({ products }) =>
    sum(products, ({ quantity }) => quantity)
  );

  return (
    <View style={styles.purchasesInfo}>
      <Headline style={{ marginBottom: 8 }}>Total</Headline>

      <View
        style={[{ borderColor: colors.primary }, styles.purchasesInfoCards]}
      >
        <Card style={styles.purchasesInfoCard}>
          <View style={styles.purchasesInfoCardIcon}>
            <Avatar.Icon color={colors.icon} size={40} icon="cash" />
          </View>
          <Title style={{ color: colors.primary, textAlign: 'center' }}>
            Gasto
          </Title>
          <Paragraph style={{ color: colors.primary, textAlign: 'center' }}>
            {formatPriceToBrazilStyle(totalPrice)}
          </Paragraph>
        </Card>

        <View style={{ flex: 0.05 }} />

        <Card style={styles.purchasesInfoCard}>
          <View style={styles.purchasesInfoCardIcon}>
            <Avatar.Icon color={colors.icon} size={40} icon="food" />
          </View>
          <Title style={{ color: colors.primary, textAlign: 'center' }}>
            Produtos
          </Title>
          <Paragraph style={{ color: colors.primary, textAlign: 'center' }}>
            {totalProducts}
          </Paragraph>
        </Card>
      </View>
    </View>
  );
}
