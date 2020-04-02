using System;
using System.Collections.Generic;
using System.Text;

namespace Cat_V_Dog_Library.Interfaces
{
    public interface IAnimalRepo
    {
        public bool Create(Animal animal);  // creates an animal and assign it to user
        public void Delete(int animalId); // deletes animal
        public bool Update(Animal animal); // updates animal stats

    }
}
