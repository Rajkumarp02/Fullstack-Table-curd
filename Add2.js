import React, {
    Component
  } from 'react';
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify';
//import { useHistory } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
//toast.configure()


import {Input,FormGroup,Label,Modal,ModalHeader,ModalBody,ModalFooter,Table,Button,} from 'reactstrap';

  class Student extends Component{

    
       constructor(prpos){
         super()
        this.state = {
          student:[],
          addStudent:{
            s_firstname:"",
            s_lastname:"",
            location:"",
            email:"",
           education:""
         
          },
          editStudent:
          {
            s_firstname:"",
            s_lastname:"",
            location:"",
            email:"",
            education:""
          },
          addModal:false,
          editModal:false
        }
        
        
      }
        
    
    
  
    componentDidMount(){
      this.refreshData();
      //this is a call back function
      
    }
    toggleAddModal() {
      this.setState({
        addModal:!this.state.addModal
      })
    }
    toggleEditModal() {
      this.setState({
        editModal:!this.state.editModal
      })
    }
    
      refreshData(){
       axios.get("http://localhost:5000/api/get")
       .then(res =>{
         
         
       this.setState({student:res.data})
        
       })
       .catch(error => {
         console.log(error)
       });
       
        }
        
  addStudent(){
          axios.post("http://localhost:5000/api/post",this.state.addStudent)
          .then( (res) => {
            let {student} = this.state;
            student.push(res.data);
            setTimeout(() => this.refreshData(),500);
            this.setState({student,addModal:false, addStudent:{
            s_firstname:"",
            s_lastname:"",
            location:"",
            email:"",
            education:""
          
          }});
        });
        
      }
        
      editStudent(id,s_firstname,s_lastname,location,email,education){
        this.setState({
        editStudent:{id,s_firstname,s_lastname,location,email,education },editModal:!this.state.editModal
     });
      }
      getData(){
        axios.get('http://localhost:5000/api/get/')
        .then((res) => {
          const result = res.data.map(el => {
            let o = Object.assign({},el);
            o.editModal=false;
            return 0;
          }) 
          
          this.setState({student:result});
        });
      }
      updateStudent(){
        let {id,s_firstname,s_lastname,location,email,education}=this.state.editStudent;
        axios.put(`http://localhost:5000/api/update/${id}`,{
            s_firstname,s_lastname,location,email,education
        })
        .then((res) => {
        this.refreshData();
        this.setState({
        editModal:false,editStudent:{
        id:"",
        s_firstname:"",
        s_lastname:"",
        location:"",
        email:"",
        education:""
          
          }
        });
    
        });
        console.log(this.refreshData());
      }
    
        deleteContact = (id) =>  {
        if(window.confirm("Are you sure want to delete ?")){
            axios.delete(`http://localhost:5000/api/remove/${id}`);
           
             toast.success("contact deleted sucessfully");
             setTimeout(() => this.refreshData(),500);
             
             
             
        }
        
    }
          
        
            
    
        

      
    

    
    

render(){
      return(
      <div>
        
        <ToastContainer /> 
          
          <div>
           
            <Table className="table">
            <thead className="thead-dark" >
              <tr>
               <React.Fragment>
               <th scope="col">id</th>
                <th scope="col">FirstName</th>
                <th scope="col">Lastname</th>
                <th scope="col">Location</th>
                <th scope="col">Email</th>
                <th scope="col">Education</th>
                <th scope="col">Action</th>
                <th scope="col">Delete</th>
               
                </React.Fragment> 
                
              </tr>
            </thead>
            <tbody> 
              {this.state.student.map(student => (
                
                  <tr key={student.id}>

<th scope='row'>{student.id}</th>
                 
                 <td>{student.s_firstname}</td>
                 <td>{student.s_lastname}</td> 
                 <td>{student.location}</td>
                 <td>{student.email}</td>
                 <td>{student.education}</td>
                  <td><button type="button" className="btn btn-outline-danger" onClick={this.editStudent.bind(this,student.id,student.s_firstname,student.s_lastname,student.location,student.email,student.education)}>Edit</button></td>
                 <td><button type="button" className="btn btn-outline-danger" onClick={this.deleteContact.bind(this,student.id)}> Delete</button></td>
                   </tr>
                   
        
         ))
               } 
               
         </tbody>
          </Table>  
          </div>
          <button  className="my-3" color="primary"  onClick={this.toggleAddModal.bind(this)}>Add student</button>
          <Modal isOpen={this.state.addModal} toggle={this.toggleAddModal.bind(this)}>
            <ModalHeader toggle={this.toggleAddModal.bind(this)}>Add Student</ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for="firstname">FirstName</Label>
                <Input id="name" type = "text" value={this.state.addStudent.s_firstname} onChange ={(e) => {
                    let {addStudent} = this.state;
                    addStudent.s_firstname=e.target.value;


                this.setState({addStudent});
                }} />
    
                  
              </FormGroup>
             
              <FormGroup>
                <Label for="lastname">Lastname</Label>
                <Input id="lastname" type="text" value={this.state.addStudent.s_lastname} onChange ={(e) => {
                    let {addStudent} = this.state;
                    addStudent.s_lastname = e.target.value;
                    this.setState({addStudent});
                }} />
    
              </FormGroup>
              <FormGroup>
                <Label for="location">Location</Label>
                <Input id="location" type="text" value={this.state.addStudent.location} onChange={(e) => { 
                    let {addStudent} = this.state;
                    addStudent.location = e.target.value;
                this.setState({addStudent});
                }} />
    
                  
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input id="email" type="email" value={this.state.addStudent.email} onChange ={(e) => {
                    let {addStudent} = this.state;
                    addStudent.email=e.target.value;
                this.setState({addStudent});
                }} />
    
                  
              </FormGroup>
              <FormGroup>
                <Label for="education">Education</Label>
                <Input id="education" type="text" value={this.state.addStudent.education} onChange ={(e) => {
                    let {addStudent} = this.state;
                    addStudent.education = e.target.value;
                this.setState({addStudent});
                }} />
    
                  
              </FormGroup>


            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.addStudent.bind(this)}>addStudent</Button>
              <Button color="primary" onClick={this.toggleAddModal.bind(this)}>cancel</Button>
            </ModalFooter>
          </Modal>
     <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
            <ModalHeader toggle={this.toggleEditModal.bind(this)}>editStudent</ModalHeader>
            <ModalBody>
            <FormGroup>
                <Label for="firstname">FirstName</Label>
                <Input id ="firstname" type = "text" value={this.state.addStudent.s_firstname} onChange ={(e) => {
                    let {addStudent} = this.state;
                    addStudent.s_firstname=e.target.value;


                this.setState({addStudent});
                }} />
    
                  
              </FormGroup>
             
              <FormGroup>
                <Label for="lastname">Lastname</Label>
                <Input id="lastname" type="text" value={this.state.addStudent.s_lastname} onChange ={(e) => {
                    let {addStudent} = this.state;
                    addStudent.s_lastname = e.target.value;
                    this.setState({addStudent});
                }} />
    
              </FormGroup>
              <FormGroup>
                <Label for="location">Location</Label>
                <Input id="location" type="text" value={this.state.addStudent.location} onChange={(e) => { 
                    let {addStudent} = this.state;
                    addStudent.location = e.target.value;
                this.setState({addStudent});
                }} />
    
                  
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input id="email" type="email" value={this.state.addStudent.email} onChange ={(e) => {
                    let {addStudent} = this.state;
                    addStudent.email=e.target.value;
                this.setState({addStudent});
                }} />
    
                  
              </FormGroup>
              <FormGroup>
                <Label for="education">Education</Label>
                <Input id="education" type="text" value={this.state.addStudent.education} onChange ={(e) => {
                    let {addStudent} = this.state;
                    addStudent.education = e.target.value;
                this.setState({addStudent});
                }} />
    
                  
              </FormGroup> 

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateStudent.bind(this)}>updateStudent</Button>
              <Button color="primary" onClick={this.toggleEditModal.bind(this)}>cancel</Button>
            </ModalFooter>
          </Modal>

          
          

        </div>

    )
    
}
}


export default Student;