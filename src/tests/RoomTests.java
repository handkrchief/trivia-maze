package tests;

import static org.junit.jupiter.api.Assertions.*;

//import java.util.ArrayList;
//import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import model.Item;
import model.Room;

/**
 * JUnit tests for the Room class.
 * @author Caleb Carroll (uwnetid: calebca)
 * @version 11.05.2024
 * 
 */
class RoomTests {
    Room theRoom;
    Item theItem;

    

    @BeforeEach
    void setUp() throws Exception {
        theRoom = new Room(0,0);
        theItem = new Item("50-50");
    }

    @Test
    void testRoom() {
        assertTrue(theRoom != null);
    }

    @Test
    void testCloseRoom() {
        theRoom.closeRoom();
        assertFalse(theRoom.getOpenState());
    }

    @Test
    void testOpenRoom() {
        theRoom.openRoom();
        assertTrue(theRoom.getOpenState());
    }

    @Test
    void testSetLockedIsLocked() {
        theRoom.setLocked(true);
        assertTrue(theRoom.isLocked());
        theRoom.setLocked(false);
        assertFalse(theRoom.isLocked());
    }

    @Test
    void testIsItemRoom() {
        assertFalse(theRoom.isItemRoom());
    }

    @Test
    void testSetItemRoom() {
        theRoom.setItemRoom(true);
        assertTrue(theRoom.isItemRoom());
    }

    @Test
    void testGetCol() {
        assertEquals(0, theRoom.getCol());
    }

    @Test
    void testGetRow() {
        assertEquals(0, theRoom.getRow());
    }

    @Test
    void testHasItem() {
        assertFalse(theRoom.hasItem());
    }

    @Test
    void testGetItem() {
        assertEquals(null, theRoom.getItem());
    }

    @Test
    void testSetItem() {
        theRoom.setItem(theItem);
        assertEquals(theItem, theRoom.getItem());
    }

    @Test
    void testIsAnswered() {
        assertFalse(theRoom.isAnswered());
    }

    @Test
    void testSetAnswered() {
        theRoom.setAnswered();
        assertTrue(theRoom.isAnswered());
    }

    @Test
    void testGetQuestion() {
        assertEquals(null, theRoom.getQuestion());
    }
    
}
