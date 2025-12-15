import { Platform } from "react-native";
import RNFS from "react-native-fs";

export async function ensureTokenizerFiles() {
  const targetDir = `${RNFS.DocumentDirectoryPath}/tokenizer`;
  const vocabTarget = `${targetDir}/vocab.txt`;

  const existsDir = await RNFS.exists(targetDir);
  if (!existsDir) await RNFS.mkdir(targetDir);

  const vocabExists = await RNFS.exists(vocabTarget);
  if (!vocabExists) {
    // Android: assets içinden kopyalama
    if (Platform.OS === "android") {
      await RNFS.copyFileAssets("tokenizer/vocab.txt", vocabTarget);
    } else {
      // iOS: mainBundlePath altında olur
      const vocabSrc = `${RNFS.MainBundlePath}/tokenizer/vocab.txt`;
      await RNFS.copyFile(vocabSrc, vocabTarget);
    }
  }

  return { vocabPath: vocabTarget };
}
