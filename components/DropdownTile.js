import { View, Text, Pressable, Image } from 'react-native';
import ChevronIcon from './icons/ChevronIcon';
import { useState } from 'react';
import { COLORS } from '../utils/theme';

export default function DropdownTile({ title, icon, children }) {
  const [open, setOpen] = useState(false);
  return (
    <View
      style={{
        alignSelf: 'stretch',
        paddingLeft: 14,
        paddingRight: 22,
        paddingVertical: 14,
        borderWidth: 0.5,
        borderRadius: 15,
        borderColor: '#E3E3E3',
      }}
    >
      <Pressable
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignSelf: 'stretch',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'space-between',
        }}
        onPress={() => setOpen((prev) => !prev)}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            width: '80%',
          }}
        >
          <Text style={{ fontSize: 18 }}>{icon}</Text>
          <Text
            style={{
              color: COLORS.BLUE,
              fontSize: 19,
              fontWeight: 'bold',
              lineHeight: 26,
            }}
          >
            {title}
          </Text>
        </View>
        <ChevronIcon
          strokeColor={COLORS.BLUE}
          direction={open ? 'top' : 'bottom'}
        />
      </Pressable>
      <View>{open && children}</View>
    </View>
  );
}
