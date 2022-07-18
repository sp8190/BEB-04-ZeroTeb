import * as React from 'react'
import { View, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/Index'

export default function MyPage() {
  const KilpAddress = useSelector(
    (state: RootState) => state.signin.KilpAddress,
  )
  console.log(KilpAddress)
  return <View style={style.myPageContainer}></View>
}

const style = StyleSheet.create({
  myPageContainer: {},
})