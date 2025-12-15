import { DeviceEventEmitter, NativeModules, Platform } from "react-native";

const { SmsModule } = NativeModules;

export function listenIncomingSms(onSms) {
  return DeviceEventEmitter.addListener(
    "SMS_RECEIVED",
    onSms
  );
}

export async function getInbox(limit = 30) {
  if (Platform.OS !== "android" || !SmsModule?.getInbox) return [];
  return SmsModule.getInbox(limit);
}
