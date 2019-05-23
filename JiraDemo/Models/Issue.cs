using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JiraDemo
{
    public class Issue
    {
        public string Name { get; set; }
        public int Id { get; set; }
        public string Type { get; set; }
        public string Status { get; set; }
        public string Assignee { get; set; }
    }
}