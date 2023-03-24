import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import ButtonComp from '../../components/common/button/ButtonComp';
import useDimension from '../../hooks/useDimension';
import theme from '../../utils/theme';
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';
import useNav from '../../hooks/useNav';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  containerWrapper: {
    alignItems: 'center',
  },
  container: {
    width: DEVICE_WIDTH * 0.9,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editor: {
    // width: '100%',
    // color: theme.textColor.light,
    flex: 1,
    marginTop: 20,
  },
  editorInner: {
    backgroundColor: 'red',
    // color: theme.textColor.main,
    // height: 500,
  },
});

type RecordEditorPropsType = {
  route: {
    params: { itemId?: number };
  };
};

export default function RecordEditor({
  route,
}: RecordEditorPropsType): JSX.Element {
  const richText = useRef();
  const navigation = useNav();
  const [context, setContext] = useState<string>('');

  const onChangeContext = (e: string) => {
    setContext(e);
  };
  const onPressBack = () => {
    navigation.pop();
  };
  const onPressSubmit = () => {};

  useEffect(() => {
    console.log(route.params);
    if (route.params) {
      // 수정하러 넘어온 애
      console.log('수정화면');
      setContext('원래이런내용이 써있는거고 이거 이제 수정하는거얌얌');
    }
  }, []);

  return (
    <SafeAreaView style={styles.containerWrapper}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Feather name='x' size={24} color='black' onPress={onPressBack} />
          <ButtonComp small={true} text='등록' onPressBtn={onPressSubmit} />
        </View>
        {/* 에디터 */}
        <View style={styles.editor}>
          <RichEditor
            initialContentHTML={context}
            placeholder='내용을 입력하세요'
            initialFocus={false}
            useContainer={true}
            // containerStyle={styles.editorInner}
            containerStyle={{
              backgroundColor: theme.background,
              // color: theme.textColor.main,
              // placeholderColor: theme.grayColor.lightGray,
            }}
            editorStyle={{
              backgroundColor: theme.background,
              color: theme.textColor.main,
              placeholderColor: theme.grayColor.lightGray,
            }}
            initialHeight={500}
            androidHardwareAccelerationDisabled={true}
            onChange={onChangeContext}
          />
          <RichToolbar
            editor={richText}
            actions={[
              actions.insertImage,
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.setStrikethrough,
              actions.setUnderline,
            ]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
