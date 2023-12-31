import { RefreshControl, ScrollView, StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { useState, useCallback, useEffect } from "react";
import useAxios from "../misc/useAxios";
import StoryPreview from "../components/StoryPreview";
import { ActivityIndicator } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import useAuth from "../misc/useAuth";

export interface PostI {
  content: string;
  authorId: string;
  createdAt: string;
  id?: string;
  likes: any[];
}
export default function Explore({ route, navigation }) {
  const axios = useAxios();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<PostI[]>([]);
  // console.log("expuser", user && user.id);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setPosts([]);
    const resp = axios
      .get<PostI[]>("posts")
      .then((resp) => {
        // console.log("rew,", resp.request);
        // log
        if (resp.data) {
          setPosts(resp.data);
        }
      })
      .catch((err) => {
        console.log("couldnt fetch posts", err);
      });

    setRefreshing(false);
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
    }, [navigation, user])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title} selectable={false}>
        Explore stories
      </Text>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.inside}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={"#FFFC5C"} />}
      >
        {posts ? (
          posts.map((post) => (
            <StoryPreview
              authorId={post.authorId}
              content={post.content}
              likes={post.likes}
              createdAt={post.createdAt}
              key={post.id}
              id={post.id}
              setPosts={setPosts}
            />
          ))
        ) : (
          <ActivityIndicator size="large" color="#FFFC5C" />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#121517",
    paddingTop: 15,
    paddingHorizontal: 5,
    justifyContent: "space-between",
    // backgroundColor: "red",
    gap: 10,
  },
  inside: {
    gap: 7,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFC5C",
    width: "100%",
    marginLeft: 20,
  },
  scroll: {
    flex: 1,
    width: "100%",
    gap: 10,
    paddingHorizontal: 5,
  },
});
