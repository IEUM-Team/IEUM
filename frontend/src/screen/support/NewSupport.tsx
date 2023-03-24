import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';

// Radio Button
import { RadioButton } from 'react-native-paper';

// Text Editor
import {
  actions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';

// Image Picker
import * as ImagePicker from 'expo-image-picker';

// Date Picker
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import ButtonComp from '../../components/common/button/ButtonComp';
import theme from '../../utils/theme';

// 신규 게시물
export default function NewSupport(): JSX.Element {
  // 체크된 태그를 표시 =========================================
  const [checked, setChecked] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  // ===========================================================
  const [title, setTitle] = useState<string>('');
  const [context, setContext] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [goal, setGoal] = useState<number>(0);
  // 모집 기한 ==================================================
  const [due, setDue] = useState<string>(new Date().toString());
  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = (date: any) => {
    console.warn('날짜가 선택되었습니다: ', date);
    hideDatePicker();
  };

  const [text, setText] = useState<string>('');
  // ===========================================================

  const [addImage, setAddImage] = useState<string[]>([]);
  const richText = React.useRef<RichEditor>(null);

  // ImagePicker 사용을 위한 부분
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // 사진 O, 동영상 X
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      const prevImage = [...addImage];
      // 흠..일단은 넣어보겠는데 나중에 확인 ㄱㄱㄱ
      prevImage.push(result.assets[0].uri);
      setAddImage(prevImage);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* 1. 제목 */}
      <View style={styles.write}>
        <Text>제목</Text>
        <TextInput
          placeholder='제목을 입력하세요'
          onChangeText={(e) => setTitle(e)}
        />
      </View>
      {/* 0. 후원 태그(분야) 선택 */}
      <View style={styles.write}>
        <View style={styles.guideline}>
          <Text>태그 선택</Text>
          <Text style={{ fontSize: 8, marginLeft: 5 }}>
            * 어떤 꿈을 후원받고 싶은지 태그를 지정해주세요
          </Text>
        </View>
        {/* 안예쁜데..?;;; 걍 태그 모양으로 넣자..일단 틀만 잡아놓고..;; */}
        <RadioButton.Group onValueChange={(tag) => setTag(tag)} value={tag}>
          <RadioButton.Item
            label='안예쁘네'
            value='first'
            color={theme.mainColor.dark}
          />
          <RadioButton.Item
            label='태그로바꾼다'
            value='second'
            color={theme.mainColor.dark}
          />
        </RadioButton.Group>
        {/* <RadioButton
          value='first'
          status={checked === 'first' ? 'checked' : 'unchecked'}
          color={theme.mainColor.dark}
          onPress={() => setChecked('first')}
        />
        <RadioButton
          value='second'
          status={checked === 'second' ? 'checked' : 'unchecked'}
          color={theme.mainColor.dark}
          onPress={() => setChecked('second')}
        /> */}
      </View>
      {/* 2. 내용 */}
      <View style={styles.write}>
        <Text>내용</Text>
        <RichEditor
          ref={richText}
          placeholder='내용을 입력하세요'
          initialHeight={250}
          editorStyle={{ backgroundColor: theme.grayColor.lightGray }}
          androidHardwareAccelerationDisabled={true}
          onChange={(e) => setContext(e)}
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
      {/* 3. 구매링크 */}
      <View style={styles.write}>
        <View style={styles.guideline}>
          <Text>구매링크</Text>
          <Text style={{ fontSize: 8, marginLeft: 5 }}>
            * 후원받으려는 물품의 구매 링크를 입력해주세요
          </Text>
        </View>
        <TextInput
          placeholder='구매링크를 입력하세요'
          onChangeText={(e) => setLink(e)}
        />
      </View>
      {/* 4. 목표금액 */}
      <View style={styles.write}>
        <Text>목표금액</Text>
        <TextInput
          placeholder='목표금액을 입력하세요'
          // onChange={(e) => setGoal(e)}
        />
      </View>
      {/* 5. 사진첨부 */}
      <View style={styles.write}>
        <View style={styles.guideline}>
          <Text>사진첨부</Text>
          <Text style={{ fontSize: 8, marginLeft: 5 }}>
            * 최대 5개까지 첨부 가능합니다
          </Text>
        </View>
        <View style={styles.img}>
          {/* <Button title='+' onPress={pickImage} /> */}
          <TouchableOpacity onPress={pickImage} style={styles.addImg}>
            <Text>+</Text>
          </TouchableOpacity>
          {/* {addImage && (
              <Image
                source={{ uri: addImage }}
                style={{ width: 200, height: 200 }}
              />
            )} */}
        </View>
        {/* 이곳에 image picker를 쓰고 싶은디..? */}
      </View>
      {/* 6. 마감기한 */}
      <View style={styles.write}>
        <Text>마감기한</Text>
        {/* 이곳에는 date picker를 쓰고 싶은디..! */}
        <TouchableOpacity onPress={showDatePicker}>
          {/* <TextInput
            pointerEvents='none'
            style={styles.textInput}
            // underlineColorAndroid={theme.mainColor.main} // 요거 밑줄인데 이미 있어서 뺄게~
            editable={false}
            value={text}
          /> */}
          <Text>📆</Text>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode='date'
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Text>{due}</Text>
        </TouchableOpacity>
      </View>
      {/* 000. 등록버튼 */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  write: {
    color: theme.textColor.light,
    marginVertical: 12,
    marginHorizontal: 20,
    borderBottomColor: theme.mainColor.light,
    borderBottomWidth: 2,
  },
  guideline: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addImg: {
    alignItems: 'center',
    borderColor: theme.grayColor.darkGray,
    borderWidth: 1.5,
    borderStyle: 'dotted',
    margin: 1,
    padding: 10,
  },
  img: {
    flex: 1,
    width: 40,
    margin: 8,
  },
  textInput: {
    fontSize: 16,
    color: theme.textColor.main,
    height: 50,
    width: 300,
    padding: 10,
  },
});
