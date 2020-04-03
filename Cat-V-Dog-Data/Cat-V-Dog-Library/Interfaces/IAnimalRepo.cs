using System;
using System.Collections.Generic;
using System.Text;

namespace Cat_V_Dog_Library.Interfaces
{
    public interface IAnimalRepo
    {
        public bool Create(Animal animal);  // creates an animal and assign it to user
        public void Delete(int userId); // deletes animal
        public bool Update(Animal animal); // updates animal stats
        public Animal Info(int userId); // get user's animal info

        public List<Animal> GetAll();

    }
}
