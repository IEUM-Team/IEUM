import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import theme from '../../../utils/theme';

const styles = StyleSheet.create({
  navWrapper: {
    position: 'absolute',
    left: 20,
    bottom: 20,
  },
  navButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    backgroundColor: theme.mainColor.main,
    borderRadius: 50,
  },
  navButtonIcon: {
    fontSize: 25,
    color: theme.textColor.white,
  },
  navListWrapper: {
    backgroundColor: theme.mainColor.main,
  },
});

type navItemType = {
  icon: string;
  name: string;
  navigateTo: string;
};

const navItem: navItemType[] = [
  {
    icon: 'a',
    name: '해류병',
    navigateTo: 'BottleStack',
  },
  {
    icon: 'a',
    name: '꿈피드',
    navigateTo: 'RecordStack',
  },
  {
    icon: 'a',
    name: '꿈후원 목록',
    navigateTo: 'SupportStack',
  },
  {
    icon: 'a',
    name: '마이페이지',
    navigateTo: 'MypageStack',
  },
  {
    icon: 'a',
    name: '알림',
    navigateTo: 'Notice',
  },
];

type navigationPropsType = {
  BottleStack?: undefined;
  RecordStack?: undefined;
  SupportStack?: undefined;
  MypageStack?: undefined;
  Notice?: undefined;
};

export default function Nav(): JSX.Element {
  const navigation = useNavigation<NavigationProp<navigationPropsType>>();
  const [isOpenNav, setIsOpenNav] = useState<boolean>(false);

  const onPressNav = (): void => {
    setIsOpenNav((prev: boolean) => !prev);
  };

  const onPressNavList = (to: string): void => {
    setIsOpenNav(false);
    to === 'BottleStack'
      ? navigation.navigate('BottleStack')
      : to === 'RecordStack'
      ? navigation.navigate('RecordStack')
      : to === 'SupportStack'
      ? navigation.navigate('SupportStack')
      : to === 'MypageStack'
      ? navigation.navigate('MypageStack')
      : navigation.navigate('Notice');
  };

  return (
    <View style={styles.navWrapper}>
      {isOpenNav && (
        <View style={styles.navListWrapper}>
          <FlatList
            data={navItem}
            renderItem={({ item, index }) => (
              <Pressable
                key={index}
                onPress={() => onPressNavList(item.navigateTo)}
              >
                <Image />
                <Text>{item.name}</Text>
              </Pressable>
            )}
          />
        </View>
      )}
      <Pressable style={styles.navButton} onPress={onPressNav}>
        <Feather name='menu' style={styles.navButtonIcon} />
      </Pressable>
    </View>
  );
}
