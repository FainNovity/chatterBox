function ChatBubble(props){
    let {user,sender,data} = props;
        return(
            <>
                <div class="clearfix">
                        <div
                            class={"mt-4 mx-2 card border-5 "+ (user==sender?"border-start-0 border-bottom-0 border-top-0 border-warning float-end":"border-end-0 border-bottom-0 border-top-0 border-info")}
                            style={{maxWidth:(sender==""?"100%":"min(30ch,60%)"),background:"rgb(23,23,23,0.5)"}}
                            >
                                <div class={sender!="" && "card-header text-bg-dark bg-gradient"}>
                                <h6 class="">{sender}</h6>
                                </div>
                            <div class="card-body text-bg-secondary bg-gradient">
                                <p class="card-text text-wrap text-break">{data}</p>
                            </div>
                        </div>
                </div>
            </>
        );
}
export default ChatBubble;