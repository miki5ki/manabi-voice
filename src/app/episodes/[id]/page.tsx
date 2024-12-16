import { CreateComment, getComments } from "@/features/comments/actions";

type Props = {
  params: {
    id: string;
  };
  searchParams: object;
};
const EpisodeShowPage = async (props: Props) => {
  const { params } = props;
  const { id } = params;
  const comments = await getComments(id);

  return (
    <>
      <div>エピソードの詳細ページです</div>
      {comments &&
        comments.map((comment) => (
          <div key={comment.id}>
            <text>{comment.description}</text>
          </div>
        ))}
      <form method="POST" action={CreateComment}>
        <input hidden value="ffc21268-45cd-400d-9d46-c00314c77874" name="userId" />
        <input hidden value={id} name="episodeId" />
        <input type="input" name="description"></input>
        <button type="submit">投稿</button>
      </form>
    </>
  );
};

export default EpisodeShowPage;
