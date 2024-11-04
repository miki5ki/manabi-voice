import { deleteChannel, getChannel, updateChannel } from "@/features/channels/actions";

type Props = {
  params: {
    id: string;
  };
  searchParams: object;
};
const ChannelEditPage = async (props: Props) => {
  const { params } = props;
  const { id } = params;
  const channel = await getChannel(id);

  if (!channel) {
    return <p>チャンネルが見つかりませんでした</p>;
  }

  return (
    <>
      <form>
        <input type="hidden" name="channelId" value={channel.id} />
        <input type="text" name="channelTitle" defaultValue={channel.title} />
        <input type="text" name="channelDescription" defaultValue={channel.description ?? ""} />
        <button formAction={updateChannel}>保存</button>
        <button formAction={deleteChannel}>削除</button>
      </form>
    </>
  );
};

export default ChannelEditPage;
