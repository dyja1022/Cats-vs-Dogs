using System;
using System.Collections.Generic;
using System.Text;

namespace Cat_V_Dog_Library.Interfaces
{
    public interface IAnimalRepo
    {
        public void Create(Animal animal);  // creates an animal and assign it to user
        public void Delete(int userId); // deletes current user's animal

    }
}
