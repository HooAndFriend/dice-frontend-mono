import { auth } from "@/src/config/firebaseConfig";
import { SocialType } from "@/src/type/auth";
import {
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
} from "firebase/auth";

export const firebaseLogin = async (type: SocialType) => {
  switch (type) {
    case "GOOGLE":
      const googleProvider = new GoogleAuthProvider();
      const {
        user: {
          email: googleEmail,
          displayName: googleDisplayName,
          uid: googleUid,
        },
      } = await signInWithPopup(auth, googleProvider);

      return {
        email: googleEmail,
        displayName: googleDisplayName,
        uid: googleUid,
      };

    case "GITHUB":
      const githubProvider = new GithubAuthProvider();
      const {
        user: {
          email: githubEmail,
          displayName: githubDisplayName,
          uid: githubUid,
        },
      } = await signInWithPopup(auth, githubProvider);

      return {
        email: githubEmail,
        displayName: githubDisplayName,
        uid: githubUid,
      };

    default:
      break;
  }
};
