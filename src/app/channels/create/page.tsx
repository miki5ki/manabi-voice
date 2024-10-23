import { createChannel } from "@/features/channels/actions";

const ChannelCreatePage = () => {
  return (
    <>
      <form action={createChannel}>
        <input type="text" name="channelTitle" placeholder="チャンネルタイトル" />
        <input type="text" name="channelDescription" placeholder="チャンネル詳細" />
        <button>作成</button>
      </form>
    </>
  );
};

export default ChannelCreatePage;
