import React, { useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';

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
import { Ionicons } from '@expo/vector-icons';

// 배송지 주소
import Postcode from '@actbase/react-daum-postcode';

import theme from '../../utils/theme';
import useDimension from '../../hooks/useDimension';
import Tag from '../../components/record/Tag';
import SubmitButton from '../../components/support/SubmitButton';
import TextEditor from '../../components/common/editor/TextEditor';

const { DEVICE_WIDTH, DEVICE_HEIGHT } = useDimension();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  mainTitleContainer: {
    marginTop: DEVICE_HEIGHT * 0.05,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: theme.fontSize.big,
    fontWeight: '600',
  },
  innerContainer: {
    marginBottom: 70,
  },
  write: {
    color: theme.textColor.light,
    marginVertical: 12,
    marginHorizontal: 20,
    paddingBottom: 5,
    borderBottomColor: theme.mainColor.light,
    borderBottomWidth: 2,
  },
  tagBox: {
    marginVertical: 5,
    marginHorizontal: 20,
  },
  title: {
    fontSize: theme.fontSize.regular,
    fontWeight: '600',
    marginVertical: DEVICE_HEIGHT * 0.015,
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
  goalBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dueDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
});

// 날짜 형식 지정
const dateFormat = (date: any) => {
  let month = date.getMonth() + 1;
  let day = date.getDate();

  month = month >= 10 ? month : '0' + month;
  day = day >= 10 ? day : '0' + day;

  return date.getFullYear() + '-' + month + '-' + day;
};

// 신규 게시물
export default function NewSupport(): JSX.Element {
  // 체크된 태그를 표시 =========================================
  const [checked, setChecked] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  // ===========================================================
  const [title, setTitle] = useState<string>('');
  // TextEditor의 input
  const [context, setContext] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [link, setLink] = useState<string>('');
  const [goal, setGoal] = useState<number>(0);
  // 모집 기한 ==================================================
  const [due, setDue] = useState<string>(dateFormat(new Date()));

  const [isDatePickerVisible, setDatePickerVisibility] =
    useState<boolean>(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    console.log('날짜가 선택되었습니다: ', date);
    setDue(dateFormat(date));
    hideDatePicker();
  };

  const [text, setText] = useState<string>('');

  // 배송지 주소
  const [mainAddress, setMainAddress] = useState<string>('');
  const [detailAddress, setDetailAddress] = useState<string>('');
  const [isAddress, setIsAddress] = useState<boolean>(false);
  // ===========================================================

  const [addImage, setAddImage] = useState<string[]>([]);

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

  const handleContextChange = (data: any) => {
    setContext(data);
  };

  // 카카오 API로 받아온 주소 데이터
  const handleSelectedAddress = (data: any) => {
    if (isAddress) {
      setMainAddress(JSON.stringify(data.address));
      setIsAddress(false);
    } else {
      setIsAddress(true);
    }
  };

  // 상세 주소
  const handleDetailAddressInput = (e: any) => {
    setDetailAddress(e.nativeEvent.text);
  };

  const onSubmitBtn = () => {
    console.log('등록하기');
  };

  return (
    <>
      {isAddress ? (
        <Postcode
          style={{ width: '100%', height: '100%' }}
          jsOptions={{ animation: true }}
          onSelected={handleSelectedAddress}
          onError={(data: any) => console.log(data)}
        />
      ) : (
        <ScrollView style={styles.container}>
          <View style={styles.mainTitleContainer}>
            <Text style={styles.mainTitle}>작성하기</Text>
          </View>
          <View style={styles.innerContainer}>
            {/* 0. 제목 */}
            <View style={styles.write}>
              <Text style={styles.title}>제목</Text>
              <TextInput
                placeholder='제목을 입력하세요'
                onChangeText={(e) => setTitle(e)}
              />
            </View>
            {/* 1. 후원 태그(분야) 선택 */}
            <View style={styles.tagBox}>
              <View style={styles.guideline}>
                <Text style={styles.title}>태그 선택</Text>
                <Text style={{ fontSize: 8, marginLeft: 5 }}>
                  * 어떤 꿈을 후원받고 싶은지 태그를 지정해주세요
                </Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Tag text='학업' />
                <Tag text='여행' />
                <Tag text='나무꾼' />
                <Tag text='+' />
              </ScrollView>
            </View>
            {/* 2-1. 후원 요청 내용 */}
            <View style={styles.write}>
              <View style={styles.guideline}>
                <Text style={styles.title}>후원 요청 내용</Text>
                <Text style={{ fontSize: 8, marginLeft: 5 }}>
                  * 어떤 물품을 후원받으려 하는지 설명해주세요
                </Text>
              </View>
              <TextInput
                placeholder='후원받으려는 물품에 대해 작성해주세요'
                onChangeText={(e) => setProductName(e)}
              />
            </View>
            {/* 2-2. 구매링크 */}
            <View style={styles.write}>
              <View style={styles.guideline}>
                <Text style={styles.title}>구매링크</Text>
                <Text style={{ fontSize: 8, marginLeft: 5 }}>
                  * 후원받으려는 물품의 구매 링크를 입력해주세요
                </Text>
              </View>
              <TextInput
                placeholder='구매링크를 입력하세요'
                onChangeText={(e) => setLink(e)}
              />
            </View>
            {/* 3. 내용 */}
            <View style={styles.write}>
              <Text style={styles.title}>내용</Text>
              <TextEditor onChangeContext={handleContextChange} />
              {/* 너 진짜 가만 안둔다 */}
              {/* <RichEditor
                ref={richText}
                placeholder='내용을 입력하세요'
                initialFocus={false}
                initialHeight={500}
                editorStyle={{ backgroundColor: theme.background }}
                androidHardwareAccelerationDisabled={true}
                onChange={(e) => setContext(e)}
              />
              <RichToolbar
                editor={richText}
                selectedIconTint={theme.mainColor.dark}
                actions={[
                  actions.insertImage,
                  actions.setBold,
                  actions.setItalic,
                  actions.insertBulletsList,
                  actions.insertOrderedList,
                  actions.setStrikethrough,
                  actions.setUnderline,
                ]}
                style={{ backgroundColor: theme.background }}
              /> */}
            </View>
            {/* 4. 목표금액 */}
            <View style={styles.write}>
              <Text style={styles.title}>목표금액</Text>
              <View style={styles.goalBox}>
                <TextInput
                  keyboardType='numeric'
                  placeholder='목표금액을 입력하세요'
                  // onChange={(e) => setGoal(e)}
                />
                <Text>원</Text>
              </View>
            </View>
            {/* 5. 사진첨부 */}
            <View style={styles.write}>
              <View style={styles.guideline}>
                <Text style={styles.title}>사진첨부</Text>
                <Text style={{ fontSize: 8, marginLeft: 5 }}>
                  * 최대 5개까지 첨부 가능합니다
                </Text>
              </View>
              <View style={styles.img}>
                <Pressable onPress={pickImage} style={styles.addImg}>
                  <Text>+</Text>
                </Pressable>
                {/* {addImage && (
                  <Image
                    source={{ uri: addImage }}
                    style={{ width: 200, height: 200 }}
                  />
                )} */}
              </View>
            </View>
            {/* 6. 마감기한 */}
            <View style={styles.write}>
              <Text style={styles.title}>마감기한</Text>
              <Pressable onPress={showDatePicker} style={styles.dueDate}>
                <Ionicons
                  name='calendar'
                  size={20}
                  color='black'
                  style={{ marginRight: 8 }}
                />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode='date'
                  confirmTextIOS='날짜 선택'
                  cancelTextIOS='취소'
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
                <Text>{due}</Text>
              </Pressable>
            </View>
            {/* 7. 배송지 입력 */}
            {/* 카카오 지도 API를 활용해 주소를 입력받는 부분 */}
            <View style={styles.write}>
              <View style={styles.guideline}>
                <Text style={styles.title}>배송지 목록</Text>
                <Text style={{ fontSize: 8, marginLeft: 5 }}>
                  * 물품을 배송받을 배송지를 입력해주세요
                </Text>
              </View>
              <TextInput
                placeholder='배송지를 입력하세요'
                onPressOut={handleSelectedAddress}
                value={mainAddress.substring(1, mainAddress.length - 1)}
              />
              <TextInput
                placeholder='상세주소를 입력하세요'
                onChange={handleDetailAddressInput}
              />
            </View>
          </View>
        </ScrollView>
      )}
      <SubmitButton onPressSubmitBtn={onSubmitBtn} />
    </>
  );
}