import { Modal, Button } from "antd";

export type HelpProperties = {
    show: boolean;
    handleClose: () => void;
};

export default function Help(props: HelpProperties) {
    return (
        <Modal
            title="Play Instructions"
            open={props.show}
            onOk={props.handleClose}
            onCancel={props.handleClose}
            footer={[
                <Button key="ok" onClick={props.handleClose}>Ok</Button>
            ]}
        >
        </Modal>
    )
}