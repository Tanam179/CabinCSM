import Button from '../../ui/Button';
import CreateEditCabinForm from './CreateEditCabinForm';
import Modal from '../../ui/Modal';

// const AddCabin = () => {
//     const [isOpenModal, setIsOpenModal] = useState(false);

//     const handleOpenModal = function (e) {
//         e.stopPropagation();
//         setIsOpenModal(true);
//     };

//     const handleCloseModal = function() {
//         setIsOpenModal(false);
//     }

//     return (
//         <Fragment>
//             <Button onClick={handleOpenModal}>Add New Cabin</Button>
//             {isOpenModal && <Modal onClose={handleCloseModal}><CreateEditCabinForm onClose={handleCloseModal} type='modal'/></Modal>}
//         </Fragment>
//     );
// };

const AddCabin = function () {
    return (
        <div>
            <Modal>
                <Modal.Open opens="cabin-form">
                    <Button>Add new Cabin</Button>
                </Modal.Open>
                <Modal.Window name="cabin-form">
                    <CreateEditCabinForm />
                </Modal.Window>
            </Modal>
        </div>
    );
};

export default AddCabin;
