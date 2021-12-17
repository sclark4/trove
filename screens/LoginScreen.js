import * as React from 'react';
import { Text, View, Image, Button } from 'react-native';
import {styles} from '../style/styles';

export default function LoginScreen(props) {
  return ( 
    <View style={styles.container}>
      <Text style={styles.paragraph}>
       This is our login/signup page
      </Text>
    </View>
  );
}

// export default function SettingsScreen(props) {
//   return (
// 
//       <Text style={styles.h1}>
//       Wendy Wellesley
//       </Text>
//       <Image
//             style={styles.regularProfile}
//             source={require('../assets/icon.png')}
//           />
//       <Text style={styles.h2}>
//       @wwwendy
//       </Text>
//       <Text style={styles.paragraph}>
//       Birthday: 11/29/2021
//       </Text>
//       <Text style={styles.paragraph}>
//       Email: ww1@wellesley.edu
//       </Text>
//       <Pressable
//     onPress={()=>alert("To Be Implemented")}>
//     <Icon name='edit' raised reverse color='#a5c6ff' />
//   </Pressable>
//   </View>
//     </View>
//   );
// }