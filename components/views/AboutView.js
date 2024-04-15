import { View, Text, ActivityIndicator, Image } from 'react-native';
import { COLORS } from '../../utils/theme';
import { API_URL } from '../../utils/constants';
import { useEffect, useState } from 'react';
import DropdownTile from '../DropdownTile';
import YoutubePlayer from 'react-native-youtube-iframe';

export default function AboutView() {
  const [news, setNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);

  useEffect(() => {
    setLoadingNews(true);
    setLoadingVideos(true);
    setLoadingMembers(true);

    fetch(`${API_URL}/noticias.php`)
      .then((response) => response.json())
      .then((data) => setNews(data.datos))
      .catch((error) => console.error(error))
      .finally(() => {
        setTimeout(() => {
          setLoadingNews(false);
        }, 1000);
      });

    fetch(`${API_URL}/videos.php`)
      .then((response) => response.json())
      .then((data) => setVideos(data.datos))
      .catch((error) => console.error(error))
      .finally(() => {
        setTimeout(() => {
          setLoadingVideos(false);
        }, 1000);
      });

    fetch(`${API_URL}/miembros.php`)
      .then((response) => response.json())
      .then((data) => setMembers(data.datos))
      .catch((error) => console.error(error))
      .finally(() => {
        setTimeout(() => {
          setLoadingMembers(false);
        }, 1000);
      });
  }, []);

  return (
    <View
      style={{
        paddingHorizontal: 26,
        paddingVertical: 15,
        gap: 24,
        marginBottom: '92%',
      }}
    >
      <DropdownTile icon='📰' title={`Últimas noticias ${`(${news.length})`}`}>
        {loadingNews ? (
          <View style={{ paddingVertical: 20 }}>
            <ActivityIndicator size='large' color={COLORS.BLUE} />
          </View>
        ) : (
          news.map((newsItem) => (
            <View
              style={{ paddingHorizontal: 10, paddingVertical: 25 }}
              key={newsItem.id}
            >
              <Text
                style={{
                  color: COLORS.WHITE,
                  fontSize: 14,
                  marginBottom: 9,
                  backgroundColor: COLORS.BLUE,
                  alignSelf: 'flex-start',
                  borderRadius: 40,
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  fontWeight: 'bold',
                }}
              >
                {newsItem.fecha}
              </Text>
              <Text
                style={{
                  color: COLORS.ORANGE,
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}
              >
                {newsItem.titulo}
              </Text>
              <Text
                style={{
                  color: '#4E4E4E',
                  fontSize: 15,
                  lineHeight: 22,
                }}
              >
                {newsItem.contenido}
              </Text>
            </View>
          ))
        )}
      </DropdownTile>
      <DropdownTile icon='📺' title={`Videos ${`(${videos.length})`}`}>
        {loadingVideos ? (
          <View style={{ paddingVertical: 20 }}>
            <ActivityIndicator size='large' color={COLORS.BLUE} />
          </View>
        ) : (
          <View style={{ gap: 15, paddingTop: 25, paddingHorizontal: 10 }}>
            {videos.map((video) => {
              return (
                <View key={video.id}>
                  <Text
                    style={{
                      color: COLORS.WHITE,
                      fontSize: 14,
                      marginBottom: 10,
                      backgroundColor: COLORS.BLUE,
                      alignSelf: 'flex-start',
                      borderRadius: 40,
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      fontWeight: 'bold',
                    }}
                  >
                    {video.fecha}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.ORANGE,
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginBottom: 10,
                    }}
                  >
                    {video.titulo}
                  </Text>
                  <Text
                    style={{
                      color: '#4E4E4E',
                      fontSize: 15,
                      lineHeight: 22,
                      marginBottom: 15,
                    }}
                  >
                    {video.descripcion}
                  </Text>
                  <YoutubePlayer
                    height={200}
                    play={false}
                    videoId={video.link}
                  />
                </View>
              );
            })}
          </View>
        )}
      </DropdownTile>
      <DropdownTile icon='👥' title={`Miembros ${`(${members.length})`}`}>
        {loadingMembers ? (
          <View style={{ paddingVertical: 20 }}>
            <ActivityIndicator size='large' color={COLORS.BLUE} />
          </View>
        ) : (
          <View
            style={{
              gap: 20,
              paddingTop: 25,
              paddingBottom: 15,
              paddingHorizontal: 10,
            }}
          >
            {members.map((member) => {
              return (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 15,
                  }}
                  key={member.id}
                >
                  <Image
                    style={{ borderRadius: 1000 }}
                    width={80}
                    height={80}
                    source={{ uri: member.foto }}
                  />
                  <View style={{ width: '70%' }}>
                    <Text
                      style={{
                        color: COLORS.BLUE,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}
                    >
                      {member.nombre}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.ORANGE,
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}
                    >
                      {member.cargo}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        )}
      </DropdownTile>
    </View>
  );
}
