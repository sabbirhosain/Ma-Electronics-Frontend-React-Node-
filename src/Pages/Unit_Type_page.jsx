import Layout from '../Layout/Layout'
import { MdFormatListBulletedAdd } from 'react-icons/md'
import { Link } from 'react-router-dom'
import Table_Unit_Types from '../Components/Unit_Types/Table_Unit_Types'
import { useUnitType_Context } from '../Context/UnitType_Context'

const Unit_Type_page = () => {
    const { unit_types, updateUnitTypesState } = useUnitType_Context()

    return (
        <Layout>
            <section className=''>
                <div className='d-flex align-items-center justify-content-between bg-light shadow-sm p-3 pe-md-5 my-2'>
                    <h4 className='table_name_title'>Unit Types List</h4>
                    <Link to='/unittype-create' className='btn btn-outline-primary btn-sm rounded-0'><MdFormatListBulletedAdd /></Link>
                </div>

                <div className="row bg-light shadow-sm p-3">
                    <div className="col-md-9"></div>
                    <div className="col-md-3">
                        <div className='w-100'>
                            <input type="search" value={unit_types.search} onChange={(event) => updateUnitTypesState({ search: event.target.value })} className="form-control rounded-0" placeholder="Search Hear..." />
                        </div>
                    </div>
                </div>

                <div className='pt-2 pb-5'>
                    <Table_Unit_Types />
                </div>
            </section>
        </Layout>
    )
}

export default Unit_Type_page